/**
 * @author Alex Tsytsiura
 * @date February 14, 2021
 * @ticket BAP-14683
 * @description Controller for the ArticleInternalInfo LWC component, used to show internal information
 */

public with sharing class ArticleInternalInfoController {
    @AuraEnabled(Cacheable=true)
    public static String getInternalArticleInfo(Id recordId) {
        if( recordId == null ) return null;

        if( recordId.getSobjectType() == Public__kav.SObjectType ) {
            Public__kav article = [
                    SELECT Id, Internal_Info__c
                    FROM Public__kav
                    WHERE Id = :recordId
            ];

            return article.Internal_Info__c;
        } else if( recordId.getSobjectType() == Learning__kav.SObjectType ) {
            Learning__kav article = [
                    SELECT Id, Internal_Info__c
                    FROM Learning__kav
                    WHERE Id = :recordId
            ];

            return article.Internal_Info__c;
        }

        return null;
    }
}