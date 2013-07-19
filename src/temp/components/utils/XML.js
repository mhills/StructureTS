define(['libs/json2xml', 'libs/xml2json'],
    function (json2xml, xml2json) {
        return {
            toJSON: xml2json.xml2json, //from xml to json
            fromJSON: json2xml.json2xml, //from json to xml
            parse: function (xml) { //parse xml string with dom parser
                var dom = null;
                if (window.DOMParser) {
                    try {
                        dom = (new DOMParser()).parseFromString(xml, "text/xml");
                    }
                    catch (e) {
                        dom = null;
                    }
                }
                else if (window.ActiveXObject) {
                    try {
                        dom = new ActiveXObject('Microsoft.XMLDOM');
                        dom.async = false;
                        if (!dom.loadXML(xml)) // parse error ..
                            throw new Error(dom.parseError.reason + dom.parseError.srcText);
                    }
                    catch (e) {
                        dom = null;
                    }
                }
                else {
                    throw new Error("XML has an issue parsing xml string with dom parser");
                }
                return dom;
            }
        };
    }
);