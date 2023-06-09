/* eslint-disable react/jsx-key */
import React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Icon, iconRegistry, IconTypes, Text } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

const $demoIconContainer: ViewStyle = {
  padding: spacing.extraSmall,
}

const $iconTile: ViewStyle = {
  width: "33.333%",
  alignItems: "center",
  paddingVertical: spacing.extraSmall,
}

const $iconTileLabel: TextStyle = {
  marginTop: spacing.tiny,
  color: colors.textDim,
}

const $customIconContainer: ViewStyle = {
  padding: spacing.medium,
  backgroundColor: colors.palette.angry500,
}

const $customIcon: ImageStyle = {
  tintColor: colors.palette.neutral100,
}

export const DemoIcon: Demo = {
  name: "Crystal",
  description:
    "Constantly losing focus and having trouble organizing your thoughts? \n\nAlways forgetting to complete your tasks and stick to your reminders?",
  data: [
    <DemoUseCase
    name="Try out Crystal!"
    layout="row">
      <Text>1. Easily log and organize random thoughts, tasks, and goals</Text>
      <Text>2. Effectively crank out study sessions w/o distractions</Text>
      <Text>3. Identify top aggravators towards your stress and focus</Text>
    </DemoUseCase>
    // <DemoUseCase
    //   name="Icons"
    //   description="List of icons registered inside the component."
    //   layout="row"
    // >
    //   {Object.keys(iconRegistry).map((icon) => (
    //     <View key={icon} style={$iconTile}>
    //       <Icon icon={icon as IconTypes} color={colors.tint} size={35} />

    //       <Text size="xs" style={$iconTileLabel}>
    //         {icon}
    //       </Text>
    //     </View>
    //   ))}
    // </DemoUseCase>,

    // <DemoUseCase name="Size" description="There's a size prop." layout="row">
    //   <Icon icon="ladybug" containerStyle={$demoIconContainer} />
    //   <Icon icon="ladybug" size={35} containerStyle={$demoIconContainer} />
    //   <Icon icon="ladybug" size={50} containerStyle={$demoIconContainer} />
    //   <Icon icon="ladybug" size={75} containerStyle={$demoIconContainer} />
    // </DemoUseCase>,

    // <DemoUseCase name="Color" description="There's a color prop." layout="row">
    //   <Icon icon="ladybug" color={colors.palette.accent500} containerStyle={$demoIconContainer} />
    //   <Icon icon="ladybug" color={colors.palette.primary500} containerStyle={$demoIconContainer} />
    //   <Icon
    //     icon="ladybug"
    //     color={colors.palette.secondary500}
    //     containerStyle={$demoIconContainer}
    //   />
    //   <Icon icon="ladybug" color={colors.palette.neutral700} containerStyle={$demoIconContainer} />
    //   <Icon icon="ladybug" color={colors.palette.angry500} containerStyle={$demoIconContainer} />
    // </DemoUseCase>,

    // <DemoUseCase name="Styling" description="The component can be styled easily." layout="row">
    //   <Icon icon="ladybug" style={$customIcon} size={40} containerStyle={$customIconContainer} />
    // </DemoUseCase>,
  ],
}

// @demo remove-file
