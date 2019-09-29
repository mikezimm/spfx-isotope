import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AIsotopeTestWebPart.module.scss';
import * as strings from 'AIsotopeTestWebPartStrings';

//* MZ CHANGES---- added imports for jQuery and isotope ---- */
import * as $ from 'jquery';
//AC Format of require
require('isotope');


//this doesn't really work either
//import * as isotope from 'isotope-layout'

export interface IAIsotopeTestWebPartProps {
  description: string;
}

export default class AIsotopeTestWebPart extends BaseClientSideWebPart<IAIsotopeTestWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.aIsotopeTest }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">

            <h1>Isotope - sorting</h1>

              <div class="${ styles.buttonGroup } sort-by-buttonGroup">
                <button class="${ styles.button } isChecked${ styles.button }" data-sort-value="original-order">original order</button>
                <button class="${ styles.button }" data-sort-value="name">name</button>
                <button class="${ styles.button }" data-filter="${ styles.transition }">transition</button>
              </div>

              <div class="${ styles.grid }">
                <div class="${ styles.elementItem } ${ styles.postTransition } metal " data-category="post-transition">
                  <h3 class="${styles.name}">Bismuth</h3>
                  <p class="${styles.symbol}">Bi</p>
                  <p class="${styles.number}">83</p>
                  <p class="${styles.weight}">208.980</p>
                </div>
                <div class="${ styles.elementItem } ${ styles.nobleGas } nonmetal " data-category="noble-gas">
                  <h3 class="${styles.name}">Argon</h3>
                  <p class="${styles.symbol}">Ar</p>
                  <p class="${styles.number}">18</p>
                  <p class="${styles.weight}">39.948</p>
                </div>
                <div class="${ styles.elementItem } ${ styles.transition } metal " data-category="transition">
                  <h3 class="${styles.name}">Gold</h3>
                  <p class="${styles.symbol}">Au</p>
                  <p class="${styles.number}">79</p>
                  <p class="${styles.weight}">196.967</p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>`;

      //const container:  JQuery = $(`.${ styles.aIsotopeTest }`, this.domElement);

    /* MZ CHANGES----   https://codepen.io/desandro/pen/lzCqe ---- */
    /* MZ CHANGES---- replace noble-gas with nobleGas ---- */
    /* MZ CHANGES---- replace button-group with buttonGroup ---- */
    /* MZ CHANGES---- replace element-item with elementItem ---- */
    /* MZ CHANGES---- replace is-checked with isChecked ---- */

    // external js: isotope.pkgd.js

    // init Isotope
    // codepen code:   
    //    var $grid = $('.grid').isotope({
    //    error on var was:  Unexpected token. A constructor, method, accessor, or property was expected.
    //    error on .isotope was:  prototype isotope does not exist on type JQuery<HTMLElements>
    
    /*

      */

//    OR THIS Syntax?      
//   var $grid = $(styles.grid).isotope({


/*   //ORIGINAL Typescript from Codepen
*/
    var $grid: any= $(`.${styles.grid}`);
    $grid.isotope({
      itemSelector: `.${styles.elementItem}`,
      layoutMode: 'fitRows',
      getSortData: {
        name: '.name',
        symbol: '.symbol',
        number: '.number parseInt',
        category: '[data-category]',
        weight: function( itemElem ) {
          var weight = $( itemElem ).find('.weight').text();
          return parseFloat( weight.replace( /[\(\)]/g, '') );
        }
      }
    });

/*
    const grid:  JQuery = $(styles.grid, this.domElement);
     var $grid = (grid as any).isotope({
      itemSelector: '.elementItem',
      layoutMode: 'fitRows',
      getSortData: {
        name: '.name',
        symbol: '.symbol',
        number: '.number parseInt',
        category: '[data-category]',
        weight: function( itemElem ) {
          var weight = $( itemElem ).find('.weight').text();
          return parseFloat( weight.replace( /[\(\)]/g, '') );
        }
      }
    });
*/

    // bind sort button click
    /*   //ORIGINAL Typescript from Codepen

    $('.sort-by-buttonGroup').on( 'click', 'button', function() {
      var sortValue = $(this).attr('data-sort-value');
      $grid.isotope({ sortBy: sortValue });
    });
    */

    $('.sort-by-buttonGroup').on( 'click', `.${styles.button}`, function() {
      var sortValue = $(this).attr('data-sort-value');
      $grid.isotope({ sortBy: sortValue });
    });
    /*
*/

    // change is-checked class on buttons
    /*   //ORIGINAL Typescript from Codepen

    $('.buttonGroup').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.isChecked').removeClass('isChecked');
        $( this ).addClass('isChecked');
      });
    });

    */

    $(styles.buttonGroup).each( function( i, buttonGroup ) {
      var $buttonGroup = $( styles.buttonGroup );
      $buttonGroup.on( 'click', styles.button, function() {
        $buttonGroup.find(styles.isChecked).removeClass(styles.isChecked);
        $( this ).addClass(styles.isChecked);
      });
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
