///<reference path='../../../../src/com/codebelt/structurets/display/Stage.ts'/>


module codeBelt
{
    import Stage = StructureTS.Stage;

    export class CreateJSApp extends Stage
    {
        /**
         * @overridden Stage.CLASS_NAME
         */
        public CLASS_NAME:string = 'CreateJSApp';

        constructor()
        {
            super();
        }

        /**
         * @overridden Stage.createChildren
         */
        public createChildren():void
        {
            super.createChildren();

        }

        /**
         * @overridden Stage.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            super.enable();
        }

        /**
         * @overridden Stage.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            super.disable();
        }

        /**
         * @overridden Stage.destroy
         */
        public destroy():void
        {
            super.destroy();

        }

    }
}