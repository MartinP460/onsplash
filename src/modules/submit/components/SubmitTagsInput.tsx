import { useState } from 'react'
import Input from 'common/components/Input'
import Button from 'common/components/Button'

interface SubmitTagsInputProps {
  tags: string[]
  onAddTag: (tag: string) => void
}

const SubmitTagsInput = ({ tags, onAddTag }: SubmitTagsInputProps) => {
  const [activeTag, setActiveTag] = useState('')

  const handleAddTag = () => {
    if (activeTag) {
      onAddTag(activeTag.toLowerCase())
      setActiveTag('')
    }
  }

  return (
    <div className="flex w-full">
      <div className="bg-gray-100 rounded p-1 w-full">
        <Input
          name="tags"
          value={activeTag}
          onChange={(e) => setActiveTag(e.target.value)}
          label="Tags"
          className="p-2"
        />
        <div className="flex flex-wrap mt-2 gap-1">
          {tags.map((tag) => (
            <span key={tag} className="px-2 bg-gray-200 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Button
        type="button"
        variation="outline"
        className="px-6 ml-4"
        onClick={handleAddTag}
      >
        Add
      </Button>
    </div>
  )
}

export default SubmitTagsInput
