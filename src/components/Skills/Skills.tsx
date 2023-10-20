import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useSkillsQuery } from "../../services/skills/use-skills-query";

const SkillButton = ({
  skillName,
  handleToggle,
  checked,
}: {
  skillName: string;
  checked: boolean;
  handleToggle: () => void;
}) => (
  <ListItemButton onClick={handleToggle} dense disableRipple disableGutters>
    <ListItemIcon sx={{ minWidth: "unset" }}>
      <Radio edge="start" checked={checked} disableRipple size="small" />
    </ListItemIcon>
    <ListItemText primary={skillName} />
  </ListItemButton>
);

export const Skills = () => {
  const { skills, isFetching } = useSkillsQuery();
  const [proficientSkills, setProficientSkills] = useState<string[]>([]);

  if (isFetching) return null;

  const half = Math.ceil(skills.length / 2);
  const skillsListOne = skills.slice(0, half);
  const skillsListTwo = skills.slice(half);

  const onSkillChecked = (skillIndex: string) => {
    const tempProficientSkills = [...proficientSkills];
    const index = tempProficientSkills.findIndex(
      (index) => index === skillIndex
    );

    if (index >= 0) {
      tempProficientSkills.splice(index, 1);
      setProficientSkills(tempProficientSkills);
    } else {
      setProficientSkills([...proficientSkills, skillIndex]);
    }
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" mt={1} width="100%">
      <List
        sx={{
          color: "#000",
          border: "solid 1px rgba(0, 0, 0, 0.25)",
          px: 1,
          borderRadius: 1,
          width: "50%",
        }}
        disablePadding
      >
        {skillsListOne.map((skill) => (
          <ListItem key={skill.index} disablePadding>
            <SkillButton
              skillName={skill.name}
              checked={proficientSkills.includes(skill.index)}
              handleToggle={() => onSkillChecked(skill.index)}
            />
          </ListItem>
        ))}
      </List>

      <List
        sx={{
          color: "#000",
          border: "solid 1px rgba(0, 0, 0, 0.25)",
          px: 1,
          borderRadius: 1,
          mt: 1,
          width: "50%",
        }}
        disablePadding
      >
        {skillsListTwo.map((skill) => (
          <ListItem key={skill.index} disablePadding>
            <SkillButton
              skillName={skill.name}
              checked={proficientSkills.includes(skill.index)}
              handleToggle={() => onSkillChecked(skill.index)}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
