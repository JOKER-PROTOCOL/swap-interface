import { TwitterLogoWhite } from 'icons'

export const TwitterShareButton = ({
  buttonTitle = 'Tweet',
  text,
  url,
  hashtags,
  className,
}: {
  buttonTitle?: string
  text?: string
  url?: string
  hashtags?: string
  className?: string
}) => {
  const _url = url ? encodeURI(url) : ''
  const _text = text && encodeURI(text)

  return (
    <a
      className={`twitter-share-button text-white flex items-center px-4 py-2 rounded-lg border border-white ${className}`}
      target='_blank'
      data-size='large'
      href={`https://twitter.com/intent/tweet?text=${_text}&url=${_url}&hashtags=${hashtags}`}
    >
      <TwitterLogoWhite className='mr-1' />
      {buttonTitle}
    </a>
  )
}
