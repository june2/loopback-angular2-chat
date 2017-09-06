/* tslint:disable */

declare var Object: any;
export interface TodoInterface {
  "title": string;
  "duedate"?: Date;
  "id"?: number;
}

export class Todo implements TodoInterface {
  "title": string;
  "duedate": Date;
  "id": number;
  constructor(data?: TodoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Todo`.
   */
  public static getModelName() {
    return "Todo";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Todo for dynamic purposes.
  **/
  public static factory(data: TodoInterface): Todo{
    return new Todo(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Todo',
      plural: 'Todos',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "duedate": {
          name: 'duedate',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
