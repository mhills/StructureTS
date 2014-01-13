///<reference path='../../../../../../src/com/codebelt/structurets/model/Collection.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/controller/LocalStorageController.ts'/>

///<reference path='vo/TodoItemVO.ts'/>

module codeBelt
{
    import Collection = StructureTS.Collection;
    import LocalStorageController = StructureTS.LocalStorageController;

    export class TodoCollection extends Collection
    {

        public CLASS_NAME:string = 'TodoCollection';

        private _localStorage:LocalStorageController = null;

        constructor()
        {
            super();

            // Create value object so we can use the actual class name that is going to be the namespace.
            // We could of hard coded a string for the namespace but this will help if the class is refactored/renamed later.
            var vo:TodoItemVO = new TodoItemVO();

            var namespace:string = vo.getQualifiedClassName() + ".";

            // Create a local storage controller and set the namespace for it.
            this._localStorage = new LocalStorageController();
            this._localStorage.setNamespace(namespace);

            this.getItemsFromLocalStorage();
        }


        /**
         * @overridden Collection.addItem
         */
        public addItem(item:TodoItemVO, silent:boolean = false):void
        {
            super.addItem(item, silent);

            this._localStorage.addItem(item.id, item, true);
        }

        /**
         * @overridden Collection.removeItem
         */
        public removeItem(item:TodoItemVO, silent:boolean = false):void
        {
            super.removeItem(item, silent);

            this._localStorage.removeItem(item.id, true);
        }

        /**
         * @overridden Collection.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._localStorage.destroy();
            this._localStorage = null;
        }

        public saveItem(item:TodoItemVO):void
        {
            this._localStorage.addItem(item.id, item, true);
        }

        private getItemsFromLocalStorage():void
        {
            var items:any[] = this._localStorage.getItemsWithNamespace();
            var itemsLength:number = items.length;
            var todoItemVO:TodoItemVO;

            for (var i:number = 0; i < itemsLength; i++)
            {
                todoItemVO = new TodoItemVO(items[i].value);
                super.addItem(todoItemVO, true);
            }
        }

    }
}