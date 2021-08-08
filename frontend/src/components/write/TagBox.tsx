import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import oc from 'open-color';

const TagBoxBlock = styled.div`
  width: 100%;
  padding-top: 2rem;
  padding-left: 1rem;

  h4 {
    color: ${oc.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${oc.gray[9]}; /* 스타일 초기화 */
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }

  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background-color: ${oc.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background-color: ${oc.gray[6]};
    }
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${oc.gray[6]};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const TagItem = React.memo(
  ({ tag, onRemove }: { tag: string; onRemove: (tagName: string) => void }) => (
    <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
  )
);

const TagList = React.memo(
  ({ tags, onRemove }: { tags: string[]; onRemove: (tagName: string) => void }) => (
    <TagListBlock>
      {tags.map((tag) => (
        <TagItem key={tag} tag={tag} onRemove={onRemove} />
      ))}
    </TagListBlock>
  )
);

/**
 * 태그 등록 컴포넌트
 * @returns
 */
function TagBox() {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState<string[]>([]);

  const insertTag = useCallback(
    (tag: string) => {
      if (!tag) return;
      if (localTags.includes(tag)) return;
      setLocalTags([...localTags, tag]);
    },
    [localTags]
  );

  const onRemove = useCallback(
    (tag: string) => {
      setLocalTags(localTags.filter((item) => item !== tag));
    },
    [localTags]
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
    },
    [input, insertTag]
  );

  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input value={input} onChange={onChange} placeholder="태그를 입력하세요" />
        <button type="submit">추가</button>
      </TagForm>
      <TagList onRemove={onRemove} tags={localTags} />
    </TagBoxBlock>
  );
}
export default React.memo(TagBox);
