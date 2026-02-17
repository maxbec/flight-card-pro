import { css } from 'lit';

export const resetStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const cardStyles = css`
  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }

  .main-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--ha-space-3);
  }

  .main-content-left {
    flex-basis: 1.5fr;
    font-size: 22px;
    line-height: 1.1;
    font-weight: var(--ha-font-weight-bold, 600);
    color: var(--flight-card-primary-color);
  }

  .callsign-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .callsign-info > p {
    font-size: 13px;
    color: var(--flight-card-secondary-color);
  }

  .callsign-info .live-indicator {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--ha-font-size-xs, 10px);
    padding: 2px 6px;
    color: white;
    background: var(--flight-card-accent-color-light);
    border-radius: 999px;
  }

  .callsign-info .live-indicator .pulse {
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background: white;
    animation: pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .flight-locations {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 6px;
    font-size: 15px;
    opacity: 0.9;
    --mdc-icon-size: 14px;
  }

  .flight-speed-info-container {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
    row-gap: 4px;
  }

  .flight-speed-info-container .label {
    font-size: 9px;
    color: var(--flight-card-secondary-color);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .flight-speed-info-container .value {
    font-size: 18px;
    font-weight: var(--ha-font-weight-bold, 600);
  }

  .flight-delay-container {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .flight-delay-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: rgba(0, 0, 0, 0.06);
    color: var(--flight-card-secondary-color);
  }

  .flight-delay-pill.late {
    background: var(--flight-card-accent-color-light);
    color: white;
  }

  .flight-delay-pill .flight-delay-label {
    opacity: 0.8;
  }

  .main-content-right {
    flex-basis: 0.5fr;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    align-self: center;
    text-align: center;

    color: var(--flight-card-secondary-color);
  }

  .main-content-right .airline-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 2px;
  }

  .main-content-right .airline-container img {
    max-width: 70px;
    max-height: 20px;
    object-fit: contain;
    filter: drop-shadow(0 0 2px var(--flight-card-secondary-color));
  }

  .main-content-right .airline-container p {
    font-size: var(--ha-font-size-s);
    line-height: var(--ha-line-height-condensed, 1.2);
  }

  .main-content-right .aircraft-photo {
    border-radius: 6px;
    max-width: 104px;
    height: auto;
    color: var(--flight-card-secondary-color);
    --mdc-icon-size: 52px;
  }

  .main-content-right .aircraft-model {
    font-size: var(--ha-font-size-s);
    line-height: var(--ha-line-height-condensed, 1.2);
  }

  .flight-progress {
    display: block;
    margin-top: var(--ha-space-3);
  }
`;
