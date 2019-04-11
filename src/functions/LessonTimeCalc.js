exports.GetLessonsInHour = date => {
  const h = date.getHours();

  // 8:44 -> x1 -> Id of lesson before 8:45
  // 8:45 -> me=45 -> Border Value
  // 8:46 -> x2 -> Id of lesson after 8:45

  if (h < 8) {
    return { date, me: 0, x1: 1, x2: 1 };
  }
  else if (h == 8) {
    return { date, me: 45, x1: 1, x2: 2 };
  }
  else if (h == 9) {
    return { date, me: 40, x1: 2, x2: 3 };
  }
  else if (h == 10) {
    return { date, me: 35, x1: 3, x2: 4 };
  }
  else if (h == 11) {
    return { date, me: 30, x1: 4, x2: 5 };
  }
  else if (h == 12) {
    return { date, me: 25, x1: 5, x2: 6 };
  }
  else if (h == 13) {
    return { date, me: 20, x1: 6, x2: 7 };
  }
  else if (h == 14) {
    return { date, me: 20, x1: 7, x2: 8 };
  }
  else if (h == 15) {
    return { date, me: 15, x1: 8, x2: 9 };
  }
  else if (h == 16) {
    return { date, me: 5, x1: 9, x2: 1 };
  }
  return { date, me: 0, x1: 1, x2: 1 };
};

exports.GetLessonId = hourObj => {
  const m = hourObj.date.getMinutes(); // Current Minute
  const me = hourObj.me; // End Minute

  if (m < me) {
    return hourObj.x1
  }
  else if (m >= me) {
    return hourObj.x2
  }
}

exports.QuickGetLessonId = date => {
  const hourObj = exports.GetLessonsInHour(date);
  const lessonId = exports.GetLessonId(hourObj);
  return lessonId;
}
