define(function(require) {
        "use strict"

        var Global = require('constants/Global');
        var UserVODataMap = require('json!data/datamap/UserVO.json');

        /**
         * @class AdminUtil
         */
        var AdminUtil = function() {
        };

        AdminUtil.accessRoleList = function(role) {
            var arrayOfProperties = Global.ALLOWED_ROLES[role];
            var hash = UserVODataMap.ROLE;

            var i;
            var key;
            var unionHash = {};
            for (i = 0; i < arrayOfProperties.length; i++) {
                key = arrayOfProperties[i];

                if (key in hash) {
                    unionHash[key] = hash[key];
                }
            }

            return unionHash
        };

        return AdminUtil;
    }
);