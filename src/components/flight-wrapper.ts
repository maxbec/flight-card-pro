import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { resetStyles } from '../styles';

@customElement('flight-wrapper')
export class FlightWrapper extends LitElement {
  @property({ type: String })
  public cardTitle?: string;

  static styles = [
    resetStyles,
    css`
      ha-card {
        padding: 12px;
        color: var(--flight-card-primary-color);
        min-height: 100%;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ha-space-3);
        color: var(--flight-card-secondary-color);
      }

      .header .title {
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 8px;
      }

      .header ::slotted(*) {
        margin-bottom: 8px;
      }
    `,
  ];

  protected render() {
    return html`
      <ha-card>
        <div class="header">
          <div>${this.cardTitle ? html`<p class="title">${this.cardTitle}</p>` : nothing}</div>
          <slot name="top-right"></slot>
        </div>

        <slot></slot>
      </ha-card>
    `;
  }
}
