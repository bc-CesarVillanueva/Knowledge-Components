/**
 * Created by Alex Tsytsiura on February 14, 2021.
 * BAP-14683
 */

import { LightningElement, api, track } from 'lwc';
import getInternalArticleInfo from '@salesforce/apex/ArticleInternalInfoController.getInternalArticleInfo';

import SectionTitleInternalInfo from '@salesforce/label/c.SectionTitleInternalInfo';

export default class ArticleInternalInfo extends LightningElement {
    @api recordId;
    @track internalInfo;
    @track isLoaded = false;

    label = {
        SectionTitleInternalInfo
    }

    connectedCallback() {
        getInternalArticleInfo({ recordId: this.recordId }).then(result => {
            this.internalInfo = result;
            this.isLoaded = true;
        });
    }
}