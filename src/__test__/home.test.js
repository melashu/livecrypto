import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from '../pages/Home/Home';
import customerRender from './customerRender';

describe('Testing the whole UI', () => {
  const hundler = [
    rest.get('https://api.coincap.io/v2/assets', (reg, res, cx) => res(
      cx.json({
        data: [
          {
            id: 'bitcoin',
            rank: '1',
            symbol: 'BTC',
            name: 'Bitcoin',
            supply: '19179093.0000000000000000',
            maxSupply: '21000000.0000000000000000',
            marketCapUsd: '367660910726.5324222208867577',
            volumeUsd24Hr: '15239880792.3436690303984666',
            priceUsd: '19169.8799691170183189',
            changePercent24Hr: '-0.2504680418463366',
            vwap24Hr: '19581.1710335538622336',
            explorer: 'https://blockchain.info/',
          },
          {
            id: 'ethereum',
            rank: '2',
            symbol: 'ETH',
            name: 'Ethereum',
            supply: '122793981.4990000000000000',
            maxSupply: null,
            marketCapUsd: '159310868780.7044226766713394',
            volumeUsd24Hr: '5870171441.3632654456180465',
            priceUsd: '1297.3833638744078515',
            changePercent24Hr: '1.8201831723044924',
            vwap24Hr: '1316.7086887362593685',
            explorer: 'https://etherscan.io/',
          },
          {
            id: 'tether',
            rank: '3',
            symbol: 'USDT',
            name: 'Tether',
            supply: '68422459806.6999200000000000',
            maxSupply: null,
            marketCapUsd: '68449830416.3727524858442623',
            volumeUsd24Hr: '20940455230.8780020730502569',
            priceUsd: '1.0004000237604751',
            changePercent24Hr: '-0.0559702293363406',
            vwap24Hr: '1.0004748811408528',
            explorer: 'https://www.omniexplorer.info/asset/31',
          },
        ],
      }),
    )),
  ];

  const server = setupServer(...hundler);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  test('Test Home', async () => {
    customerRender(<Home />);
    const inputBox = screen.getByText('Total number of Coin');
    expect(inputBox).toBeInTheDocument();
  });

  it('Dose the search box present in the screen', async () => {
    customerRender(<Home />);
    const result = await screen.findByPlaceholderText('Search crypto....');
    expect(result).toBeInTheDocument();
  });

  it('Should three crypto exist', async () => {
    customerRender(<Home />);
    const result = await screen.findAllByTestId('cryptoname');
    expect(result).toHaveLength(3);
  });

  it('Should the navigation work?', async () => {
    customerRender(<Home />);
    const link = await screen.findAllByRole('link');
    fireEvent.click(link[0], () => {
      expect(screen.getByText('Detail about')).toBeInTheDocument();
    });
  });

  it('Should crypto name exist in the detail page?', async () => {
    customerRender(<Home />);
    const link = await screen.findAllByRole('link');
    fireEvent.click(link[0], () => {
      expect(screen.getByText('tether')).toBeInTheDocument();
    });
  });

  it('Should USDT exist?', async () => {
    customerRender(<Home />);
    const link = await screen.findAllByRole('link');
    fireEvent.click(link[0], () => {
      expect(screen.getByText('USDT')).toBeInTheDocument();
    });
  });

  it('Should back to home icon exist?', async () => {
    customerRender(<Home />);
    const link = await screen.findAllByRole('link');
    fireEvent.click(link[0], () => {
      expect(screen.getByTestId('backbutton')).toBeInTheDocument();
    });
  });
});
