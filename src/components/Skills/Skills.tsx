import { Box, CircularProgress, List, ListItem, Stack } from "@mui/material";
import React, { useState } from "react";
import { useSkills } from "../../services/skills/use-skills-query";
import { SkillButton } from "./SkillButton";
import { useAppSelector } from "../../hooks/hooks";
import { getModifier } from "../../models/abilities.models";

const getInitialProficiencies = () => {
  const skills = localStorage.getItem("skills");

  return skills ? JSON.parse(skills) : [];
};

export const Skills = () => {
  const { skills, isFetching } = useSkills();

  const { proficiencyBonus, stats } = useAppSelector((state) => state.hero);
  const [proficientSkills, setProficientSkills] = useState<string[]>(
    getInitialProficiencies()
  );

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
      localStorage.setItem("skills", JSON.stringify(tempProficientSkills));
      setProficientSkills(tempProficientSkills);
    } else {
      const proficiencies = [...proficientSkills, skillIndex];
      localStorage.setItem("skills", JSON.stringify(proficiencies));
      setProficientSkills(proficiencies);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="flex-start"
      mt={1}
      width="100%"
    >
      {isFetching ? (
        <Box
          sx={{
            display: "flex",
            m: "auto",
            height: "50vh",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
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
              <ListItem key={skill.id} disablePadding>
                <SkillButton
                  modifier={getModifier(Number.parseInt(stats[skill.stat]))}
                  bonus={Number.parseInt(proficiencyBonus) ?? 0}
                  skillName={skill.name}
                  checked={proficientSkills.includes(skill.id)}
                  handleToggle={() => onSkillChecked(skill.id)}
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
              <ListItem key={skill.id} disablePadding>
                <SkillButton
                  modifier={getModifier(Number.parseInt(stats[skill.stat]))}
                  bonus={Number.parseInt(proficiencyBonus) ?? 0}
                  skillName={skill.name}
                  checked={proficientSkills.includes(skill.id)}
                  handleToggle={() => onSkillChecked(skill.id)}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Stack>
  );
};
