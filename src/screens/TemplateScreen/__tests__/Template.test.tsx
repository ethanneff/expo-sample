import { describe, it } from '@jest/globals';

describe('template', () => {
  describe('network', () => {
    it.todo('shows reconnection when lost connection');

    it.todo('allows user to reconnect');

    it.todo('shows unknown error modal');

    it.todo('allows user to refresh');
  });

  describe('initial load', () => {
    it.todo('shows loading');

    it.todo('shows no connection');

    it.todo('allows user to retry');

    it.todo('shows empty data');

    it.todo('shows data');
  });

  describe('add data', () => {
    it.todo('show loading');

    it.todo('show error when cannot create todo');

    it.todo('allows user to retry');

    it.todo('show new todo');
  });

  describe('update data', () => {
    it.todo('show loading');

    it.todo('show error when cannot update todo');

    it.todo('allows user to retry');

    it.todo('show updated todo');
  });

  describe('delete data', () => {
    it.todo('shows confirmation dialog');

    it.todo('show loading');

    it.todo('show error when cannot delete todo');

    it.todo('allows user to retry');

    it.todo('show deleted todo');
  });
});
