import { KendoTestPage } from './app.po';

describe('kendo-test App', () => {
  let page: KendoTestPage;

  beforeEach(() => {
    page = new KendoTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
