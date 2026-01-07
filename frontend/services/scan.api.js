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
        headers: {
            Accept: "application/json",
        },
    });
    const data = await response.json();
    return data;
}
