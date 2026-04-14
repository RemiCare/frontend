import { getToken, onMessage, deleteToken } from "firebase/messaging";
import { messaging } from "./firebase-config";

// 🔧 복용 시간 포맷 변경 함수
const formatTimeInBody = (rawBody) => {
  const timeRegex = /복용 시간: (\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/;
  const match = rawBody.match(timeRegex);
  if (!match) return rawBody;

  try {
    const date = new Date(match[1]);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const isPM = hours >= 12;
    const period = isPM ? "오후" : "오전";

    hours = hours % 12 || 12; // 0시는 12시로 보정

    const formattedTime = `${month}-${day}, ${period} ${hours}:${minutes}`;
    return rawBody.replace(match[1], formattedTime);
  } catch (e) {
    return rawBody;
  }
};

const saveNotification = (payload, source = "unknown") => {
  const title = payload?.data?.title || payload?.notification?.title || "";
  let body = payload?.data?.body || payload?.notification?.body || "";

  // ✅ 시간 포맷 적용
  body = formatTimeInBody(body);

  const elderlyId = payload?.data?.elderlyId || "";
  const isEmergency = title.includes("응급상황");

  const dedupKey = `${title}-${body}-${elderlyId}`;
  const existing = JSON.parse(localStorage.getItem("notifications") || "[]");

  if (!isEmergency) {
    const isDuplicate = existing.some(
      (n) => `${n.title}-${n.body}-${n?.data?.elderlyId || ""}` === dedupKey
    );
    if (isDuplicate) {
      console.log(`🚫 내용 기준 중복 알림 차단 (${source}):`, dedupKey);
      return false;
    }
  }

  const messageId =
    payload?.messageId ||
    payload?.fcmMessageId ||
    `${Date.now()}_${Math.random()}`;

  const newNotification = {
    messageId,
    title,
    body,
    time: Date.now(),
    source,
    data: payload?.data || {},
  };

  const updated = [newNotification, ...existing].slice(0, 100);
  localStorage.setItem("notifications", JSON.stringify(updated));
  console.log(`📩 ${source} 알림 저장됨:`, newNotification);
  window.dispatchEvent(new Event("notificationUpdated"));
  return true;
};

let unsubscribeForeground = null;
let isBackgroundListenerAttached = false;

export const setupForegroundListener = () => {
  console.log("🟡 setupForegroundListener() 호출됨");

  if (typeof unsubscribeForeground === "function") {
    unsubscribeForeground();
    console.log("🔁 기존 포그라운드 리스너 제거");
  }

  unsubscribeForeground = onMessage(messaging, (payload) => {
    console.log("📩 포그라운드 메시지 수신:", payload);
    const saved = saveNotification(payload, "foreground");
    if (!saved) return;

    const title = payload?.data?.title || "알림";
    const body = payload?.data?.body || "";

    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/logo.png",
      });
    }
  });
};

export const setupBackgroundListener = () => {
  if (!("serviceWorker" in navigator) || isBackgroundListenerAttached) return;
  isBackgroundListenerAttached = true;

  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data?.type === "BACKGROUND_MESSAGE") {
      console.log("📨 백그라운드 메시지 수신:", event.data);
      saveNotification(event.data.payload, "background");
    }
  });
};

export const setupAllListeners = () => {
  console.log("✅ setupAllListeners 최초 실행됨");
  setupForegroundListener();
  setupBackgroundListener();
};

// ✅ 권한 요청 및 토큰 발급
export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("🔕 알림 권한 거부됨");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey:
        "BCrhN2GE-drKvZopoZ8jdYJtRweVnXBJGV5CH9gqr2WOp0BhdAWV4ybY3W9cdxkg4Xnllqw8u4Gn0aLWie5FHfQ",
    });
    console.log("✅ FCM Token:", token);
    return token;
  } catch (error) {
    console.error("❌ FCM 토큰 요청 실패:", error);
    return null;
  }
};

export const forceRefreshFcmToken = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      console.log("🧹 기존 PushSubscription 해제됨");
    }

    await deleteToken(messaging);

    const token = await getToken(messaging, {
      vapidKey:
        "BCrhN2GE-drKvZopoZ8jdYJtRweVnXBJGV5CH9gqr2WOp0BhdAWV4ybY3W9cdxkg4Xnllqw8u4Gn0aLWie5FHfQ",
    });
    console.log("🔁 새로 발급된 FCM 토큰:", token);
    return token;
  } catch (error) {
    console.error("❌ FCM 토큰 강제 재발급 실패:", error);
    return null;
  }
};
