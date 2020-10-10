const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'TITLE',
    columns = [new Column(), new Column()]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

class Column {
  constructor({ id = uuid(), title = 'title Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Board;
