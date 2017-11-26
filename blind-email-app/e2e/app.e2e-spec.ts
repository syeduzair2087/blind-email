import { BlindEmailAppPage } from './app.po';

describe('blind-email-app App', () => {
  let page: BlindEmailAppPage;

  beforeEach(() => {
    page = new BlindEmailAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
