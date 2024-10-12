/**
`ModuleAssets` is a collection of module assets descriptors.
It maps ids of modules to a lists of style and module urls.
 */
export type ModuleAssets = Record<
  string,
  {
    /**
     * Urls of styles
     */
    styles: string[];
    /**
     * Urls of modules
     */
    modules: string[];
  }
>;
