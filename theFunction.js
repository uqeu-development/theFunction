$(document).ready(() => {



    let urlPrefix = "https://www.uniqlo.com";
    if (window.location.href.includes("prodtest")) {
        urlPrefix = "https://prodtest.uniqlo.com";
    }

    let region = "";
    let link = "";

    //get the current region
    region = $("#container").data().region;

    if (typeof products != 'undefined') {
        //if the region is DK, SE or EU we can set products[GB]
        if (region === "SE" || region === "EU" || region === "DK") {
            skus = Object.keys(products['GB']);
        } else {
            skus = Object.keys(products[region]);
        }
    }



    //construct the link with approriate region
    // link = `${urlPrefix}/on/demandware.store/Sites-${region}-Site/default/Product-HitTile?pid=`;
    link = `${urlPrefix}/on/demandware.store/Sites-${region}-Site/default/Recommendations-Ajax?item0=`

    skus.forEach((sku) => {

        $.ajax(link + sku).done((data) => {

            fetchName(data, sku);
            fetchURL(data, sku);
            fetchImage(data, sku);
            fetchSwatches(data, sku);
            fetchPrice(data, sku);
            fetchSalePrice(data, sku);

        });
    });

    fetchName = (data, sku) => {
        $(`[data-uniqlo-id='${sku}']`).map((index, el) => {
            try {
                const pName = $(data).find('.productTile__heading .productTile__link')[0].innerText.trim();
                const nameEl = $(el).find('[data-uniqlo-pname]')[0];
                $(nameEl)[0].innerText = pName;
            } catch (error) {

            }
        })
    };
    fetchPrice = (data, sku) => {

        $(`[data-uniqlo-id='${sku}']`).map((index, el) => {

            try {
                let price;
                if ($(data).find('.productTile__priceContainer .product-current-price').length === 0) {
                    //sale price exists 
                    price = $(data).find('.productTile__priceContainer .product-standard-price')[0].innerText.trim();
                } else {
                    price = $(data).find('.productTile__priceContainer .product-current-price')[0].innerText.trim();
                }
                const priceEl = $(el).find('[data-uniqlo-price]')[0];
                $(priceEl)[0].innerText = price;
            } catch (error) {

            }
        })
    };


    fetchSalePrice = (data, sku) => {

        $(`[data-uniqlo-id='${sku}']`).map((index, el) => {
            try {
                const price = $(data).find('.productTile__priceContainer .product-sales-price')[0].innerText.trim();
                const priceEl = $(el).find('[data-uniqlo-saleprice]')[0];
                $(priceEl)[0].innerText = price;
            } catch (error) {

            }
        })
    }


    fetchURL = (data, sku) => {
        $(`[data-uniqlo-id='${sku}']`).map((index, el) => {
            try {
                const url = $(data).find('.productTile__link')[0].href
                const urlEl = $(el).find('[data-uniqlo-url]')[0];
                $(urlEl)[0].href = url;

            } catch (error) {

            }
        });
    };

    fetchImage = (data, sku) => {
        $(`[data-uniqlo-id='${sku}']`).map((index, el) => {
            try {
                const image = $(data).find('.productTile__image')[0].src
                const imageEl = $(el).find('[data-uniqlo-image]')[0];
                $(imageEl)[0].src = image;

            } catch (error) {

            }
        })
    };
    fetchSwatches = (data, sku) => {
        $(`[data-uniqlo-id='${sku}']`).map((index, el) => {
            try {
                const swatches = $(data).find('.productTile__swatchList')[0].outerHTML
                const swatchesEl = $(el).find('[data-uniqlo-swatches]')[0];

                $(swatchesEl)[0].innerHTML = swatches;
                $(swatchesEl).find('ul')[0].classList.add('swatch-list')

            } catch (error) {

            }
        })
    };




});