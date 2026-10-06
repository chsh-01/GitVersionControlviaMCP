import { leapwork } from "./leapwork";

leapwork.configuration({
  timeoutMs: Number(
    leapwork.team.settings.get("timeoutMs")
    ?? leapwork.workspace.settings.get("timeoutMs")
  ) || 5000,
  enableSelfHeal:
    (leapwork.team.settings.get("enableSelfHeal")
      ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

// ai-studio-step-id: pw7uiedk00
await leapwork.step("Step name", async () => {
  // Step implementation
}, {
  action: "click"
});

// ai-studio-step-id: pw1qp0wwr0
await leapwork.step("Step name", async () => {
  // Step implementation
}, {
  action: "click"
});
