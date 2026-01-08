function getApiUrlFor(code) {
    return `https://fr.openfoodfacts.net/api/v2/product/${code}? \
                product_type=all& \
                cc=fr& \
                lc=fr& \
                fields=packaging_tags%2Cproduct_name& \
                knowledge_panel_client=app& \
                activate_knowledge_panels_simplified=false& \
                activate_knowledge_panel_physical_activities=false`;
}

/**
 * Response example:
 * ```json
 * {
 *   "code": "3017620422003",
 *   "product": {
 *     "packaging_tags": [
 *       "en:plastic",
 *       "fr:pot-en-verre"
 *     ],
 *     "product_name": "Nutella"
 *   },
 *   "status": 1,
 *   "status_verbose": "product found"
 * }
 * ```
 */
export async function getProductData(code) {
    const apiUrl = getApiUrlFor(code);

    const response = await fetch(apiUrl, {
        headers: { Accept: "application/json" },
    });

    const data = await response.json();

    const hasPlastic = Boolean(
        data.product?.packagings_materials &&
        data.product.packagings_materials["en:plastic"]
    );


    return {
        status: data.status,
        status_verbose: data.status_verbose,
        product: {
            product_name: data.product?.product_name ?? null,
            brands: data.product?.brands ?? null,
            product_quantity: data.product?.product_quantity ?? null,
            product_quantity_unit: data.product?.product_quantity_unit ?? null,
            packaging_tags: data.product?.packaging_tags ?? [],
            plastic: hasPlastic,
        },
    };
}





