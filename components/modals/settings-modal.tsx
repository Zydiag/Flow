"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ToggleMode } from "@/components/toggle-mode";

import { useSettings } from "@/hooks/use-settings";

export const SettingsModal = () => {
  const settings = useSettings();

  //not using hydration trick here

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1 ">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Coustomize your own Flow
            </span>
          </div>
          <ToggleMode />
        </div>
      </DialogContent>
    </Dialog>
  );
};
