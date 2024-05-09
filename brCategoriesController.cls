public with sharing class brCategoriesController {
    
    @AuraEnabled 
    public static List<brCategoriesCatalogModel> getCatalog(String articleType, String languageCode) {
		if(String.isBlank(languageCode)){
            languageCode = UserInfo.getLanguage();
        }else{
            languageCode = languageCode.substringBefore('#');
        }
        return brCategoriesCatalogService.getCatalog(articleType, languageCode);
    }

    @AuraEnabled
    public static Map<String,String> getArticleSectionsByArticle(String articleId) {
        Map<String,String> articleSections = new Map<String, String>();
        String articleType = Id.valueOf(articleId).getSobjectType().getDescribe().getName();

        SObject selectedArticle = Database.query('SELECT Section_Anchors__c FROM ' + articleType + ' WHERE Id = \'' + articleId + '\' LIMIT 1');

        if(String.valueOf(selectedArticle.get('Section_Anchors__c')).length() > 0) {
            for (String anchor: String.valueOf(selectedArticle.get('Section_Anchors__c')).split(';')) {
                articleSections.put(anchor.split(':')[1], anchor.split(':')[0]);
            }
        }

        return articleSections;
    }
}