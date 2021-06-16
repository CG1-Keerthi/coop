import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';

@Injectable({ providedIn: 'root' })
export class MDObjectTypeEnum extends MDBaseDS {

    
     MDObjectType = {
    
        CLASS_DIAGRAM: {value: 1, name: "Class Diagram", description: "Class Diagram"},
        BUSINESS_TERM: {value: 2, name: "Business Term", description: "Business Term"},
        SEF: {value: 3, name: "SEF", description: "SEF"},
        XSD: {value: 4, name: "XSD", description: "XSD"},
        WSDL: {value: 5, name: "WSDL", description: "WSDL"},
        CODE_LIST: {value: 6, name: "Code List", description: "Code List"},
        TRANSCODE: {value: 7, name: "Transcode", description: "Transcode"},
        BUSINESS_TERM_XSD: {value: 8, name: "Business Term XSD", description: "Business Term XSD"},
        TRUSTED_CERTIFICATE: {value: 9, name: "Trusted Certificate", description: "Trusted Certificate"},
        CATALOGUE_KEYWORDS: {value: 10, name: "Catalog Keywords", description: "Catalog Keywords"},
        API_KEY_MANAGEMENT: {value: 11, name: "Api Key Management", description: "Api Key Management"},
        COMPANY_PARTNER_PROFILE: {value: 12, name: "Company Partner profile", description: "Company Partner profile"},
        CUSTOM_USER_GROUP: {value: 13, name: "Custom User Group", description: "Custom User Group"},
        ADAPTER: {value: 14, name: "Adapter", description: "Adapter"},
        CHANNEL: {value: 15, name: "Channel", description: "Channel"},
        DOCUMENT_TYPE: {value: 16, name: "Document Type", description: "Document Type"},
        SYNONYM: {value: 17, name: "Synonym", description: "Synonym"},
        ROUTING_RULE: {value: 18, name: "Routing Rule", description: "Routing Rule"},
        PARTNER_CHANNEL_RULES: {value: 19, name: "Partner Channel Rules", description: "Partner Channel Rules"},
        PROCESS_ALERTS: {value: 20, name: "Process Alerts", description: "Process Alerts"},
        SAMPLE_FILE_BUSINESS_TERM: {value: 21, name: "Business Term from Sample", description: "Business Term from Sample"},
        USER_IMAGE: {value: 22, name: "User Image", description: "User Image"}
        
    };
    
    
    

}



