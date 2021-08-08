import Responsive from '@components/common/Responsive';
import Editor from '@components/write/Editor';
import TagBox from '@components/write/TagBox';
import WriteActionButtons from '@components/write/WriteActionButtons';
import React from 'react';

function WritePage() {
  return (
    <Responsive>
      <Editor />
      <TagBox />
      <WriteActionButtons onCancel={() => {}} onPublish={() => {}} />
    </Responsive>
  );
}

export default WritePage;
