import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AIsotopeTestWebPart.module.scss';
import * as strings from 'AIsotopeTestWebPartStrings';

/* MZ CHANGES---- added imports for jQuery and isotope ---- */
import * as $ from 'jquery';
require('isotope');

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

            <div class="buttonGroup sort-by-buttonGroup">
              <button class="button is-checked" data-sort-value="original-order">original order</button>
              <button class="button" data-sort-value="name">name</button>
            </div>

            <div class="grid">
              <div class="elementItem postTransition metal " data-category="post-transition">
                <h3 class="name">Bismuth</h3>
                <p class="symbol">Bi</p>
                <p class="number">83</p>
                <p class="weight">208.980</p>
              </div>
              <div class="elementItem nobleGas nonmetal " data-category="noble-gas">
                <h3 class="name">Argon</h3>
                <p class="symbol">Ar</p>
                <p class="number">18</p>
                <p class="weight">39.948</p>
              </div>
            </div>


            </div>
          </div>
        </div>
      </div>`;
  }


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
    var $grid = $('.grid').isotope({
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

    // bind sort button click
    $('.sort-by-buttonGroup').on( 'click', 'button', function() {
      var sortValue = $(this).attr('data-sort-value');
      $grid.isotope({ sortBy: sortValue });
    });

    // change is-checked class on buttons
    $('.buttonGroup').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.isChecked').removeClass('isChecked');
        $( this ).addClass('isChecked');
      });
    });

  */
 
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
