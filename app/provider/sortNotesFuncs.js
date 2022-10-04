const sortRecentDateFirst = (data) => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.originalDate);
    const bInt = parseInt(b.originalDate);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};
const sortLeastCountFirst = (data) => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.count);
    const bInt = parseInt(b.count);
    if (aInt < bInt) return -1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return 1;
  });
};
const sortShortestContentFirst = (data) => {
  // const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();

  return data.sort((a, b) => {
    const noHtmlA = a.content.replace(/<(.|\n)*?>/g, "").trim();
    const noHtmlB = b.content.replace(/<(.|\n)*?>/g, "").trim();

    const aInt = parseInt(noHtmlA.length);
    const bInt = parseInt(noHtmlB.length);
    if (aInt < bInt) return -1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return 1;
  });
};

export { sortRecentDateFirst, sortLeastCountFirst, sortShortestContentFirst };

// const newNote = {
//   content: note,
//   date: format(new Date(), "MMM d, yyyy. h:mm aaa"),
//   updatedDate: format(new Date(), "MMM d, yyyy. h:mm aaa"),
//   originalDate: Date.now(),
//   count: 0,
//   id: nanoid(),
// };
