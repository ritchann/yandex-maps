import React from 'react';

interface Props {
  data?: ymaps.control.ListBoxParametersData;
  items?: ymaps.control.ListBoxItemParameters|string[];
  options?: ymaps.control.ListBoxParametersOptions;
  state?: ymaps.control.ListBoxParametersState;
}

export const ListBox: React.FC<Props> = () => {
  return <ListBox />;
};
