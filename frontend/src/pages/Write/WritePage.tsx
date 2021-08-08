import Responsive from '@components/common/Responsive';
import Editor from '@components/write/Editor';
import TagBox from '@components/write/TagBox';
import WriteActionButtons from '@components/write/WriteActionButtons';
import React from 'react';

/**
 * 포스트 작성 페이지
 * /write
 * @returns
 */
function WritePage() {
  return (
    <Responsive>
      <Editor />
      <TagBox />
      <WriteActionButtons />
    </Responsive>
  );
}

export default WritePage;
