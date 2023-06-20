type HtmlParsedAnswer = {
  fragments: string[];
  citations: string[];
  followupQuestions: string[];
};

export function parseAnswerToHtml(answer: string): HtmlParsedAnswer {
  const citations: string[] = [];
  const followupQuestions: string[] = [];

  // Extract any follow-up questions that might be in the answer
  let parsedAnswer = answer.replace(/<<([^>>]+)>>/g, (match, content) => {
    followupQuestions.push(content);
    return '';
  });

  // trim any whitespace from the end of the answer after removing follow-up questions
  parsedAnswer = parsedAnswer.trim();

  const parts = parsedAnswer.split(/\[([^\]]+)\]/g);

  const fragments: string[] = parts.map((part, index) => {
    if (index % 2 === 0) {
      return part;
    } else {
      let citationIndex: number;
      if (citations.indexOf(part) !== -1) {
        citationIndex = citations.indexOf(part) + 1;
      } else {
        citations.push(part);
        citationIndex = citations.length;
      }

      return part;
    }
  });

  return {
    fragments,
    citations,
    followupQuestions,
  };
}

export const parsePageNumber = (fileName: string) => {
  const splitName = fileName.split('-');

  const tailFile = splitName[splitName.length - 1];
  const pageNumber = tailFile.split('.')[0];
  const extension = tailFile.split('.')[1];
  const filename =
    splitName.slice(0, splitName.length - 1).join('-') + `.${extension}`;

  return {
    pageNumber: Number.isInteger(Number(pageNumber))
      ? Number(pageNumber)
      : undefined,
    extension,
    filename,
  };
};
