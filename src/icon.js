/*
 * Copyright (c) 2016, Globo.com <http://github.com/globocom/megadraft-chart-plugin>
 *
 * License: MIT
 */

import React from "react";

export class PluginIcon extends React.Component {
  render() {
    return (
      <svg {...this.props} width="24" height="24" viewBox="0 0 24 24">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Desktop-HD">
            <g id="Group-5">
              <g id="Saiba-Mais-Copy-13">
                <rect id="Rectangle-69-Copy-4" fill="none" x="0" y="0" width="24" height="24" rx="12"></rect>
                <g id="video-icon-copy-16" transform="translate(3.000000, 3.000000)">
                  <polygon id="Shape" points="0 0 18 0 18 18 0 18"></polygon>
                </g>
                <g id="ic_format_quote_24px-copy" transform="translate(3.000000, 3.000000)">
                  <g id="Group">
                    <polygon id="Shape" points="-2.66453526e-15 -1.33226763e-15 18 -1.33226763e-15 18 18 -2.66453526e-15 18"></polygon>
                  </g>
                </g>
              </g>
              <polygon id="Shape" fill="#FFFFFF" fillRule="nonzero" points="14.625 11.68875 17.01 7.565625 17.983125 8.128125 15.04125 13.21875 11.379375 11.109375 8.69625 15.75 18 15.75 18 16.875 6.75 16.875 6.75 6.75 7.875 6.75 7.875 14.92875 10.96875 9.5625"></polygon>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export function PlusIcon() {
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
      <path fill="#000000" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
      <path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
  );
}
