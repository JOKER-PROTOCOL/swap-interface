import classNames from 'classnames'
import { Box, Text, BORDER_RADIUS } from 'components/Base'
import {
  PROJECT_STATUS,
  getProjectThemeByStatus,
} from 'hooks/launchpad/useLaunchpad'

export const LpdStatusTag = ({ status }: { status: PROJECT_STATUS }) => {
  const { tagDesc, tagColor, tagBg } = getProjectThemeByStatus(status)
  const bg = tagBg ? `bg-${tagBg}` : 'bg3'

  return (
    <Box
      padding='py-[2px] px-2'
      className={classNames(
        'flex items-center w-fit h-6 shrink-0 rounded-[4px] border-0',
        bg,
      )}
    >
      <div
        className={classNames('w-2 h-2 mr-2 rounded-full', `bg-${tagColor}`)}
      />
      <Text className='' color={`text-${tagColor}`}>
        {tagDesc}
      </Text>
    </Box>
  )
}
