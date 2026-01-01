const { google } = require("googleapis");

const createCalendarEvent = async (user, eventData) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
  });

  const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  const event = {
    summary: eventData.title,
    description: eventData.description,
    start: {
      dateTime: eventData.startTime,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: eventData.endTime,
      timeZone: "Asia/Kolkata",
    },
  };

  return await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
};

module.exports = createCalendarEvent;
