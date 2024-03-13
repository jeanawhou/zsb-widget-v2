import React from 'react';
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { isPlainObject } from 'lodash';

import {
  StyledComponentWrapper,
  StyledContentsWrapper,
  StyledInput,
  StyledResultItem,
  StyledResultWrapper,
} from './StyledComponent';
import useSearchComponent from './hooks';
import History from './History';

import Watermark from '../Watermark';

const SearchComponent = () => {
  const {
    value,
    handleChangeSearchInput,
    handleSearch,
    isSearchComponentLoading,
    handleKeyDown,
    searchInputRef,
    allHistory,
    lastHistory,
  } = useSearchComponent();

  return (
    <StyledComponentWrapper $isNotEmpty={value || allHistory.length ? 'true' : 'fase'}>
      <StyledInput
        size="large"
        $isNotEmpty={value || allHistory.length ? 'true' : 'fase'}
        onChange={handleChangeSearchInput}
        onKeyDown={handleKeyDown}
        addonBefore={<SearchOutlined />}
        addonAfter={
          value ? <ArrowRightOutlined tabIndex={0} title={`Search for "${value}"`} onClick={handleSearch} /> : null
        }
        placeholder="Search"
        variant={value ? 'borderless' : undefined}
        disabled={isSearchComponentLoading}
        value={value}
      />
      {value || allHistory.length ? (
        <>
          <hr />
          <StyledContentsWrapper>
            {isSearchComponentLoading ||
            (isPlainObject(lastHistory?.reply) && lastHistory?.text === value) ? null : value ? (
              <StyledResultWrapper>
                <StyledResultItem tabIndex={0} ref={searchInputRef} onKeyDown={handleKeyDown} onClick={handleSearch}>
                  <SearchOutlined />
                  <span>{`Search for "${value}"`}</span>
                </StyledResultItem>
              </StyledResultWrapper>
            ) : null}
            <History value={value} />
          </StyledContentsWrapper>
        </>
      ) : null}
      <Watermark />
    </StyledComponentWrapper>
  );
};

export default SearchComponent;
