"use strict";
import { Text } from "../entities/text";

// Descriptive documentation issue tag
export class IssueTag extends Text {
  constructor(params: IssueTag = {} as IssueTag) {
    super(params);

    this.text = params.text || ''
    this.type = "Text";
  }
}
