"use client";

import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export default function SettingsTabs() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="Branding">
        <Tab label="Branding" />
      </Tabs>
    </>
  );
}
