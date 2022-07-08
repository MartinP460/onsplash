import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../../../common/graphql/posts'
import { isValidUnsplashHttpUrl, isValidImage } from '../utils/helper'
import { useUserContext } from '../../../common/context/userContext'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import useToast from '../../../common/hooks/useToast'
import useImageDimensions from '../hooks/useImageDimensions'
import Image from 'next/image'
import Input from '../../../common/components/Input'
import Button from '../../../common/components/Button'
import SubmitTagsInput from './SubmitTagsInput'

interface FormValues {
  url: string
  description?: string
  tags?: string[]
  location?: string
  width: number
  height: number
  userId: string
}

const SubmitForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty }
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      url: ''
    }
  })
  const watchUrl = watch('url')
  const user = useUserContext()

  const [tags, setTags] = useState<string[]>([])
  const dimensions = useImageDimensions(watchUrl)
  const router = useRouter()
  const toast = useToast()

  const [submitPost, { loading, error }] = useMutation(CREATE_POST)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (dimensions.width && dimensions.height) {
      try {
        await submitPost({
          variables: {
            url: data.url,
            description: data.description,
            location: data.location,
            tags,
            width: dimensions.width,
            height: dimensions.height,
            userId: user?.id
          }
        })
        toast('success', 'Post submitted successfully.')
        const { submit, ...rest } = router.query
        router.push({ query: { ...rest } })
      } catch (error) {
        toast('error', 'An error occurred. Please try again later.')
      }
    }
  }

  const disableForm = loading || !isDirty

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 h-full">
      <div className="p-3 mb-4 bg-yellow-100 rounded text-sm flex">
        <ExclamationCircleIcon className="w-5 mr-6 shrink-0" />
        <p>
          For practical reasons, only images from&nbsp;
          <a
            className="underline text-gray-500"
            href="https://www.unsplash.com"
            target="_blank"
          >
            Unsplash
          </a>
          &nbsp; can be uploaded. Therefore, the domain name has to be
          'images.unsplash.com'. Get random image&nbsp;
          <a
            className="underline text-gray-500"
            href="https://source.unsplash.com/random"
            target="_blank"
          >
            here.
          </a>
        </p>
      </div>
      <Input
        {...register('url', {
          required: true,
          validate: {
            validUrl: (value) =>
              isValidUnsplashHttpUrl(value) ||
              'Please provide a complete, valid URL from images.unsplash.com',
            isImage: async (value) =>
              (await isValidImage(value)) || 'The URL did not return an image'
          }
        })}
        error={errors.url && errors.url?.message}
        className="p-2"
        label="Unsplash URL"
      />
      <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 h-5/6 mt-10 gap-4 pb-4">
        <div className="bg-gray-200 relative rounded flex flex-col items-center justify-center text-2xl">
          {watchUrl && dimensions.width && isValidUnsplashHttpUrl(watchUrl) ? (
            <Image src={watchUrl} layout="fill" objectFit="scale-down" />
          ) : (
            <>
              <p>Image preview.</p>
              {watchUrl && !dimensions.width && <div>...</div>}
            </>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <Input
              {...register('description')}
              className="p-2"
              label="Description"
            />
            <SubmitTagsInput
              tags={tags}
              onAddTag={(tag) => setTags([...tags, tag])}
            />
            <Input {...register('location')} className="p-2" label="Location" />
            {error && <p>{error?.message}.</p>}
          </div>
          <Button variation="filled" type="submit" disabled={disableForm}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SubmitForm
