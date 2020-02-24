import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcard:notifications';
const CHANNEL_ID = 'DailyReminder';

export function timeToString () {
  return Date.now()
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: 'Flashcards Reminder',
    body: "👋 Don't forget to study flashcards today!",
    ios: {
      sound: true
    },
    android: {
      channelId: CHANNEL_ID,
      sticky: false,
      color: 'red'
    }
  };
}

function createChannel() {
  return {
    name: 'Daily Reminder',
    description: 'This is a daily reminder for you to study your flashcards.',
    sound: true,
    priority: 'high'
  };
}

export function setLocalNotification(notificationType) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status === 'granted') {
          const notificationTime = new Date();
          if(notificationType === 1) {
            notificationTime.setTime(notificationTime.getTime() + 1 * 60000);
          } else {
            notificationTime.setDate(notificationTime.getDate() + 1);
            notificationTime.setHours(20);
            notificationTime.setMinutes(0);
          }
          if(Platform.OS === 'ios') {
            Notifications.presentLocalNotificationAsync(createNotification())
            //Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
              .then(val => console.log('Channel:', val))
              .then(() => {
                Notifications.cancelAllScheduledNotificationsAsync();
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: notificationTime,
                    repeat: 'minute'
                  }
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch(err => {
                console.log('err', err);
              });
            } else {
              Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
                .then(val => console.log('channel return:', val))
                .then(() => {
                  Notifications.cancelAllScheduledNotificationsAsync();
                  Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                      time: notificationTime,
                      repeat: 'day'
                    }
                  );

                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                })
                .catch(err => {
                  console.log('err', err);
                });
            }
          }
        });
    });
}
