"use strict";
import { Text } from "../entities/text";

// Descriptive documentation issue tag
// alex/PG-1256
// [PG-1256] http://jira.rccchina.com/browse/PG-1256
export class IssueTag extends Text {
  constructor(params: IssueTag = {} as IssueTag) {
    super(params);

    this.text = params.text || ''
    // this.text = "[PG-1256] http://jira.rccchina.com/browse/PG-1256";
    this.type = "Text";
  }
}
