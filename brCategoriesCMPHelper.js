({
    changeData: function(component) {
        this.getResponse(component);
    },

    getResponse: function(component) {
        var action = component.get("c.getCatalog"), 
            selectId = component.get('v.data.id'),
            articleType = component.get('v.data.objectName');

        let sURL = window.location.href;
        let lang;
        if (sURL.split('language=').length > 1){
            lang = sURL.split('language=')[1];
            lang = lang.split('&')[0];
        }
        action.setParams({
            articleType: articleType,
            languageCode: lang
        });

        var fSelectCategory = function(id, data) {
            var flag_selected = false,
                c1, c2, c3;
            c1 = data;
            for (var ck1 in c1) {
                if (c1[ck1].articles.length > 0) {
                    for (var i1 in c1[ck1].articles) {
                        if ((c1[ck1].articles[i1].native_article_id === id)) {
                            flag_selected = true;
                            c1[ck1].articles[i1].active = true;
                            break;
                        }
                    }
                }
                c2 = c1[ck1].categories;
                for (var ck2 in c2) {
                    if (c2[ck2].articles.length > 0) {
                        for (var i2 in c2[ck2].articles) {
                            if ((c2[ck2].articles[i2].native_article_id === id)) {
                                flag_selected = true;
                                c2[ck2].articles[i2].active = true;
                                break;
                            }
                        }
                    }
                    c3 = c2[ck2].categories;
                    for (var ck3 in c3) {
                        if (c3[ck3].articles.length > 0) {
                            for (var i3 in c3[ck3].articles) {
                                if ((c3[ck3].articles[i3].native_article_id === id)) {
                                    flag_selected = true;
                                    c3[ck3].articles[i3].active = true;
                                    break;
                                }
                            }
                        }
                        if (flag_selected) {
                            c3[ck3].active = true;
                            break;
                        }
                    }
                    if (flag_selected) {
                        c2[ck2].active = true;
                        break;
                    }
                }
                if (flag_selected) {
                    c1[ck1].active = true;
                    break;
                }
            }
        };

        action.setBackground();
        action.setStorable();

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();

                fSelectCategory(selectId, data);
                component.set("v.items", data);

            }
        });
        $A.enqueueAction(action);
    }
})