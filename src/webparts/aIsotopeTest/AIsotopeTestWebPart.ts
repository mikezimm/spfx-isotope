import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import styles from './AIsotopeTestWebPart.module.scss';
import * as strings from 'AIsotopeTestWebPartStrings';

import * as $ from 'jquery';

import mixitup from 'mixitup';

export interface IAIsotopeTestWebPartProps {
  description: string;
}

export default class AIsotopeTestWebPart extends BaseClientSideWebPart<IAIsotopeTestWebPartProps> {

  public render(): void {

    /*  Unable to get any sorting to work.
            <button class="${styles.button}" data-sort=".name:desc">sort Name Desc</button>
            OR
            <button class="${styles.button}" data-sort="name:desc">sort Name Desc</button>
    */


    /*  Passing sort during load also does not work:
        load: {
            sort: 'name:desc'
            OR
            sort: '.name:desc'
        }

    */


    /*  Unable to get active button styling to work per:
        https://www.kunkalabs.com/tutorials/filtering-with-mixitup/
        Tried these.  I'm guessing it doesn't like the "-" in classnames but that's what the library is looking for.
        
        .button:mixitup-control-active {
          background-color: black
        }
        OR
        .button.mixitup-control-active {
          background-color: black
        }
    */

    this.domElement.innerHTML = `
      <div class="${ styles.aIsotopeTest}">
            <div class="${styles.buttonGroup} filters-button-group">
              <button class="${styles.button} ${styles.isChecked}" data-filter="all">show all</button>
              <button class="${styles.button}" data-filter=".${styles.metalloid}">metalloid</button>
              <button class="${styles.button}" data-filter=".${styles.metal}">metal</button>
              <button class="${styles.button}" data-filter=".${styles.transition}">transition</button>
              <button class="${styles.button}" data-filter=".${styles.alkali}, .${styles.alkalineEarth}">alkali and alkaline-earth</button>
              <button class="${styles.button}" data-filter=":not(.${styles.transition})">not transition</button>
              <button class="${styles.button}" data-filter=".${styles.metalloid}:not(.${styles.transition})">metal but not transition</button>
              <button class="${styles.button}" data-filter="numberGreaterThan50">number > 50</button>
              <button class="${styles.button}" data-filter="ium">.name ends with &ndash;ium</button>
              <button class="${styles.button}" data-sort=".name:desc">sort Name Desc</button>
              <button class="${styles.button}" data-sort="name:asc">sort Name Asc</button>
            </div>

              <div class="${styles.grid}">
              <div class="${styles.elementItem} ${styles.transition} ${styles.metal} " data-category="${styles.transition}">
                <h3 class="name">Mercury</h3>
                <p class="symbol">Hg</p>
                <p class="number">80</p>
                <p class="weight">200.59</p>
              </div>
              <div class="${styles.elementItem} ${styles.metalloid} " data-category="${styles.metalloid}">
                <h3 class="name">Tellurium</h3>
                <p class="symbol">Te</p>
                <p class="number">52</p>
                <p class="weight">127.6</p>
              </div>
              <div class="${styles.elementItem} ${styles.postTransition} ${styles.metal} " data-category="${styles.postTransition}">
                <h3 class="name">Bismuth</h3>
                <p class="symbol">Bi</p>
                <p class="number">83</p>
                <p class="weight">208.980</p>
              </div>
              <div class="${styles.elementItem} ${styles.postTransition} ${styles.metal} " data-category="${styles.postTransition}">
                <h3 class="name">Lead</h3>
                <p class="symbol">Pb</p>
                <p class="number">82</p>
                <p class="weight">207.2</p>
              </div>
              <div class="${styles.elementItem} ${styles.transition} ${styles.metal} " data-category="${styles.transition}">
                <h3 class="name">Gold</h3>
                <p class="symbol">Au</p>
                <p class="number">79</p>
                <p class="weight">196.967</p>
              </div>
              <div class="${styles.elementItem} ${styles.alkali} ${styles.metal} " data-category="${styles.alkali}">
                <h3 class="name">Potassium</h3>
                <p class="symbol">K</p>
                <p class="number">19</p>
                <p class="weight">39.0983</p>
              </div>
              <div class="${styles.elementItem} ${styles.alkali} ${styles.metal} " data-category="${styles.alkali}">
                <h3 class="name">Sodium</h3>
                <p class="symbol">Na</p>
                <p class="number">11</p>
                <p class="weight">22.99</p>
              </div>
              <div class="${styles.elementItem} ${styles.transition} ${styles.metalloid} " data-category="${styles.transition}">
                <h3 class="name">Cadmium</h3>
                <p class="symbol">Cd</p>
                <p class="number">48</p>
                <p class="weight">112.411</p>
              </div>
              <div class="${styles.elementItem} ${styles.alkalineEarth} ${styles.metal} " data-category="${styles.alkalineEarth}">
                <h3 class="name">Calcium</h3>
                <p class="symbol">Ca</p>
                <p class="number">20</p>
                <p class="weight">40.078</p>
              </div>
              <div class="${styles.elementItem} ${styles.transition} ${styles.metalloid} " data-category="${styles.transition}">
                <h3 class="name">Rhenium</h3>
                <p class="symbol">Re</p>
                <p class="number">75</p>
                <p class="weight">186.207</p>
              </div>
              <div class="${styles.elementItem} ${styles.postTransition} ${styles.metalloid} " data-category="${styles.postTransition}">
                <h3 class="name">Thallium</h3>
                <p class="symbol">Tl</p>
                <p class="number">81</p>
                <p class="weight">204.383</p>
              </div>
              <div class="${styles.elementItem} ${styles.metalloid} " data-category="${styles.metalloid}">
                <h3 class="name">Antimony</h3>
                <p class="symbol">Sb</p>
                <p class="number">51</p>
                <p class="weight">121.76</p>
              </div>
              <div class="${styles.elementItem} ${styles.transition} ${styles.metalloid} " data-category="${styles.transition}">
                <h3 class="name">Cobalt</h3>
                <p class="symbol">Co</p>
                <p class="number">27</p>
                <p class="weight">58.933</p>
              </div>
              <div class="${styles.elementItem} ${styles.lanthanoid} ${styles.metalloid} inner-transition " data-category="${styles.lanthanoid}">
                <h3 class="name">Ytterbium</h3>
                <p class="symbol">Yb</p>
                <p class="number">70</p>
                <p class="weight">173.054</p>
              </div>
              <div class="${styles.elementItem} ${styles.nobleGas} ${styles.nonMetal} " data-category="${styles.nobleGas}">
                <h3 class="name">Argon</h3>
                <p class="symbol">Ar</p>
                <p class="number">18</p>
                <p class="weight">39.948</p>
              </div>
              <div class="${styles.elementItem} ${styles.diatomic} ${styles.nonMetal} " data-category="${styles.diatomic}">
                <h3 class="name">Nitrogen</h3>
                <p class="symbol">N</p>
                <p class="number">7</p>
                <p class="weight">14.007</p>
              </div>
              <div class="${styles.elementItem} ${styles.actinoid} ${styles.metalloid} inner-transition " data-category="${styles.actinoid}">
                <h3 class="name">Uranium</h3>
                <p class="symbol">U</p>
                <p class="number">92</p>
                <p class="weight">238.029</p>
              </div>
              <div class="${styles.elementItem} ${styles.actinoid} ${styles.metalloid} inner-transition " data-category="${styles.actinoid}">
                <h3 class="name">Plutonium</h3>
                <p class="symbol">Pu</p>
                <p class="number">94</p>
                <p class="weight">(244)</p>
              </div>
            </div>


      </div>`;

    $(document).ready(() => {
      $(`.${styles.buttonGroup}`).each((i, buttonGroup) => {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', `.${styles.button}`, () => {
          $buttonGroup.find(`.${styles.isChecked}`).removeClass(styles.isChecked);
          $(this).addClass(styles.isChecked);
        });
      });

      var thisSort = 'published-date:desc';
      thisSort = `${styles.name}` + ':desc';
      //alert(thisSort + ' ' + `${styles.metalloid}`);

      /*  This syntax for pre-filtering does work
          load: {
            filter: `.${styles.metalloid}`,
          },
      */

      var mixer = mixitup(`.${styles.grid}`, {
        load: {
          filter: `.${styles.metal}`,
          sort: '.name:desc',
        },
        selectors: {
          target: `.${styles.elementItem}`
        },
        animation: {
          duration: 300
        }
      });

/*    Tried this to pre-filter but it also does not work.      
      mixer.filter(`.${styles.metalloid}`);
      mixer.filter(`${styles.metalloid}`);
*/

/* How do you pre-filter the items as shown here:   https://codepen.io/patrickkunka/pen/sjlBG
      $(function(){
        $('#Container').mixItUp({
          load: {
            filter: '.category-1'
          }
        });
      });
*/


      
      //   var $grid: any = $(`.${styles.grid}`);
      //   $grid.isotope({
      //     itemSelector: `.${styles.elementItem}`,
      //     layoutMode: 'fitRows',
      //     getSortData: {
      //       name: '.name',
      //       symbol: '.symbol',
      //       number: '.number parseInt',
      //       category: '[data-category]',
      //       weight: function( itemElem ) {
      //         var weight = $( itemElem ).find('.weight').text();
      //         return parseFloat( weight.replace( /[\(\)]/g, '') );
      //       }
      //     }
      //   });
      // });
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
