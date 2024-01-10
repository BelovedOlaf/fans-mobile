import React, { FC } from "react";

import {
	NewFanIcon,
	EnthusiastIcon,
	BronzeSupporterIcon,
	SilverSponsorIcon,
	GoldPatronIcon,
	RubyGuardianIcon,
	EmeraldAmbassadorIcon,
	PlatinumPartnerIcon,
	SapphireChampionIcon,
	DiamondDevoteeIcon,
} from "@assets/svgs/images/Badges";

import { BadgeType } from "@usertypes/commonEnums";
import { FansSvgProps } from "@usertypes/components";

export type BadgeIconComponentType = {
	[propKey: string]: FC<FansSvgProps> | FC;
};

const BadgeIconComponents: BadgeIconComponentType = {
	[BadgeType.NewFan]: NewFanIcon,
	[BadgeType.Enthusiast]: EnthusiastIcon,
	[BadgeType.BronzeSupporter]: BronzeSupporterIcon,
	[BadgeType.SilverSponsor]: SilverSponsorIcon,
	[BadgeType.GoldPatron]: GoldPatronIcon,
	[BadgeType.RubyGuardian]: RubyGuardianIcon,
	[BadgeType.EmeraldAmbassador]: EmeraldAmbassadorIcon,
	[BadgeType.PlatinumPartner]: PlatinumPartnerIcon,
	[BadgeType.SapphireChampion]: SapphireChampionIcon,
	[BadgeType.DiamondDevotee]: DiamondDevoteeIcon,
};

export default BadgeIconComponents;
