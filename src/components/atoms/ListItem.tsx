import React, { CSSProperties, FC, ReactNode } from 'react'
import {
  ListItem as MuiListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

type Props = {
  id: string
  secondaryAction?: ReactNode
  primaryText?: string | number
  secondaryText?: string | number
  bgColor?: CSSProperties['backgroundColor']
}

const ListItem: FC<Props> = ({
  id,
  secondaryAction,
  primaryText,
  secondaryText,
  bgColor,
}) => (
  <MuiListItem
    secondaryAction={secondaryAction}
    disablePadding
    style={{
      backgroundColor: bgColor,
    }}
  >
    <ListItemButton>
      <ListItemText id={id} primary={primaryText} secondary={secondaryText} />
    </ListItemButton>
  </MuiListItem>
)

ListItem.defaultProps = {
  secondaryAction: undefined,
  primaryText: undefined,
  secondaryText: undefined,
  bgColor: undefined,
}

export default ListItem
