export interface BuildConfig
{
    readonly dev_account : string;
    readonly dev_region : string ;

    readonly prod_account : string;
    readonly prod_region : string;
    
    readonly stage_dev : string;
    readonly stage_prod : string;

    readonly prefix : string;
 
}


