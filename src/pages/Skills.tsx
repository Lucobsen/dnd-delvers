import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import React from "react";
import { useSkills } from "../services/skills/use-skills-query";
import { SkillInfo } from "../components/Skills/SkillInfo";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getModifier } from "../models/abilities.models";
import { updateHero } from "../store/slices/HeroHoardSlice";
import { useParams } from "react-router-dom";
import { Hero } from "../models/hero.models";

const Skills = () => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  const { skills, isLoading } = useSkills();

  if (!hero) return null;

  const { proficiencyBonus, stats, proficientSkills } = hero;

  const onSkillChecked = (skillIndex: string) => {
    const tempProficientSkills = [...proficientSkills];
    const index = tempProficientSkills.findIndex(
      (index) => index === skillIndex
    );

    if (index >= 0) {
      tempProficientSkills.splice(index, 1);

      const updatedHero: Hero = {
        ...hero,
        proficientSkills: tempProficientSkills,
      };
      dispatch(updateHero(updatedHero));
    } else {
      const updatedHero: Hero = {
        ...hero,
        proficientSkills: [...proficientSkills, skillIndex],
      };
      dispatch(updateHero(updatedHero));
    }
  };

  return (
    <Container sx={{ my: 6 }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            height: "60vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Stack>
          <Typography color="rgb(25, 118, 210)" variant="h6" align="left">
            Skills
          </Typography>
          <Table size="small">
            <TableBody>
              {skills.map((skill) => (
                <SkillInfo
                  stat={skill.stat}
                  key={skill.id}
                  modifier={getModifier(Number.parseInt(stats[skill.stat]))}
                  bonus={Number.parseInt(proficiencyBonus) ?? 0}
                  skillName={skill.name}
                  checked={proficientSkills.includes(skill.id)}
                  handleToggle={() => onSkillChecked(skill.id)}
                />
              ))}
            </TableBody>
          </Table>
        </Stack>
      )}
    </Container>
  );
};

export default Skills;
