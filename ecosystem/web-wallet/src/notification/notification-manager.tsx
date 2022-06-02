// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

const NOTIFICATION_HEIGHT = 620;
const NOTIFICATION_WIDTH = 360;

export default async function showPopup() {
  console.log('test');
  const left = 0;
  const top = 0;
  // create new notification popup
  await chrome.windows.create({
    height: NOTIFICATION_HEIGHT,
    left,
    top,
    type: 'popup',
    url: 'notification.html',
    width: NOTIFICATION_WIDTH,
  });
}
